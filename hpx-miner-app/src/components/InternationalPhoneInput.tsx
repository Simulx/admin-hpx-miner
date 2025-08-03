import { useState } from "react";
import { Input } from "../dashboard/components/ui/input";
import { Label } from "../dashboard/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../dashboard/components/ui/select";
import { useLanguage } from "./LanguageContext";

// Base de dados completa com máscaras de telefone por país
const phoneMasks = {
  "AC": { mask: "+247-####", name: "Ascension Island", example: "+247-1234" },
  "AD": { mask: "+376-###-###", name: "Andorra", example: "+376-123-456" },
  "AE": { mask: "+971-#-###-####", name: "Emirados Árabes Unidos", example: "+971-5-123-4567" },
  "AF": { mask: "+93-##-###-####", name: "Afeganistão", example: "+93-12-345-6789" },
  "AG": { mask: "+1(268)###-####", name: "Antígua e Barbuda", example: "+1(268)123-4567" },
  "AI": { mask: "+1(264)###-####", name: "Anguilla", example: "+1(264)123-4567" },
  "AL": { mask: "+355(###)###-###", name: "Albânia", example: "+355(123)456-789" },
  "AM": { mask: "+374-##-###-###", name: "Armênia", example: "+374-12-345-678" },
  "AO": { mask: "+244(###)###-###", name: "Angola", example: "+244(123)456-789" },
  "AR": { mask: "+54(###)###-####", name: "Argentina", example: "+54(123)456-7890" },
  "AT": { mask: "+43(###)###-####", name: "Áustria", example: "+43(123)456-7890" },
  "AU": { mask: "+61-#-####-####", name: "Austrália", example: "+61-4-1234-5678" },
  "AW": { mask: "+297-###-####", name: "Aruba", example: "+297-123-4567" },
  "AZ": { mask: "+994-##-###-##-##", name: "Azerbaijão", example: "+994-12-345-67-89" },
  "BA": { mask: "+387-##-####", name: "Bósnia e Herzegovina", example: "+387-12-3456" },
  "BB": { mask: "+1(246)###-####", name: "Barbados", example: "+1(246)123-4567" },
  "BD": { mask: "+880-##-###-###", name: "Bangladesh", example: "+880-12-345-678" },
  "BE": { mask: "+32(###)###-###", name: "Bélgica", example: "+32(123)456-789" },
  "BF": { mask: "+226-##-##-####", name: "Burkina Faso", example: "+226-12-34-5678" },
  "BG": { mask: "+359(###)###-###", name: "Bulgária", example: "+359(123)456-789" },
  "BH": { mask: "+973-####-####", name: "Bahrein", example: "+973-1234-5678" },
  "BI": { mask: "+257-##-##-####", name: "Burundi", example: "+257-12-34-5678" },
  "BJ": { mask: "+229-##-##-####", name: "Benim", example: "+229-12-34-5678" },
  "BN": { mask: "+673-###-####", name: "Brunei", example: "+673-123-4567" },
  "BO": { mask: "+591-#-###-####", name: "Bolívia", example: "+591-7-123-4567" },
  "BR": { mask: "+55(##)9####-####", name: "Brasil", example: "+55(11)99999-9999" },
  "BS": { mask: "+1(242)###-####", name: "Bahamas", example: "+1(242)123-4567" },
  "BT": { mask: "+975-#-###-###", name: "Butão", example: "+975-1-234-567" },
  "BW": { mask: "+267-##-###-###", name: "Botsuana", example: "+267-12-345-678" },
  "BY": { mask: "+375(##)###-##-##", name: "Bielorrússia", example: "+375(12)345-67-89" },
  "BZ": { mask: "+501-###-####", name: "Belize", example: "+501-123-4567" },
  "CA": { mask: "+1(###)###-####", name: "Canadá", example: "+1(416)123-4567" },
  "CD": { mask: "+243(###)###-###", name: "República Democrática do Congo", example: "+243(123)456-789" },
  "CF": { mask: "+236-##-##-####", name: "República Centro-Africana", example: "+236-12-34-5678" },
  "CG": { mask: "+242-##-###-####", name: "República do Congo", example: "+242-12-345-6789" },
  "CH": { mask: "+41-##-###-####", name: "Suíça", example: "+41-12-345-6789" },
  "CI": { mask: "+225-##-###-###", name: "Costa do Marfim", example: "+225-12-345-678" },
  "CK": { mask: "+682-##-###", name: "Ilhas Cook", example: "+682-12-345" },
  "CL": { mask: "+56-#-####-####", name: "Chile", example: "+56-9-1234-5678" },
  "CM": { mask: "+237-####-####", name: "Camarões", example: "+237-1234-5678" },
  "CN": { mask: "+86(###)####-####", name: "China", example: "+86(138)0013-8000" },
  "CO": { mask: "+57(###)###-####", name: "Colômbia", example: "+57(300)123-4567" },
  "CR": { mask: "+506-####-####", name: "Costa Rica", example: "+506-1234-5678" },
  "CU": { mask: "+53-#-###-####", name: "Cuba", example: "+53-5-123-4567" },
  "CV": { mask: "+238(###)##-##", name: "Cabo Verde", example: "+238(123)45-67" },
  "CY": { mask: "+357-##-###-###", name: "Chipre", example: "+357-12-345-678" },
  "CZ": { mask: "+420(###)###-###", name: "República Tcheca", example: "+420(123)456-789" },
  "DE": { mask: "+49(###)###-####", name: "Alemanha", example: "+49(30)1234-5678" },
  "DJ": { mask: "+253-##-##-##-##", name: "Djibuti", example: "+253-12-34-56-78" },
  "DK": { mask: "+45-##-##-##-##", name: "Dinamarca", example: "+45-12-34-56-78" },
  "DM": { mask: "+1(767)###-####", name: "Dominica", example: "+1(767)123-4567" },
  "DO": { mask: "+1(809)###-####", name: "República Dominicana", example: "+1(809)123-4567" },
  "DZ": { mask: "+213-##-###-####", name: "Argélia", example: "+213-12-345-6789" },
  "EC": { mask: "+593-##-###-####", name: "Equador", example: "+593-12-345-6789" },
  "EE": { mask: "+372-####-####", name: "Estônia", example: "+372-1234-5678" },
  "EG": { mask: "+20(###)###-####", name: "Egito", example: "+20(123)456-7890" },
  "ER": { mask: "+291-#-###-###", name: "Eritreia", example: "+291-1-234-567" },
  "ES": { mask: "+34(###)###-###", name: "Espanha", example: "+34(123)456-789" },
  "ET": { mask: "+251-##-###-####", name: "Etiópia", example: "+251-12-345-6789" },
  "FI": { mask: "+358(###)###-##-##", name: "Finlândia", example: "+358(123)456-78-90" },
  "FJ": { mask: "+679-##-#####", name: "Fiji", example: "+679-12-34567" },
  "FK": { mask: "+500-#####", name: "Ilhas Malvinas", example: "+500-12345" },
  "FR": { mask: "+33(###)###-###", name: "França", example: "+33(123)456-789" },
  "GA": { mask: "+241-#-##-##-##", name: "Gabão", example: "+241-1-23-45-67" },
  "GB": { mask: "+44-##-####-####", name: "Reino Unido", example: "+44-20-1234-5678" },
  "GD": { mask: "+1(473)###-####", name: "Granada", example: "+1(473)123-4567" },
  "GE": { mask: "+995(###)###-###", name: "Geórgia", example: "+995(123)456-789" },
  "GH": { mask: "+233(###)###-###", name: "Gana", example: "+233(123)456-789" },
  "GI": { mask: "+350-###-#####", name: "Gibraltar", example: "+350-123-45678" },
  "GL": { mask: "+299-##-##-##", name: "Groenlândia", example: "+299-12-34-56" },
  "GM": { mask: "+220(###)##-##", name: "Gâmbia", example: "+220(123)45-67" },
  "GN": { mask: "+224-##-###-###", name: "Guiné", example: "+224-12-345-678" },
  "GQ": { mask: "+240-##-###-####", name: "Guiné Equatorial", example: "+240-12-345-6789" },
  "GR": { mask: "+30(###)###-####", name: "Grécia", example: "+30(123)456-7890" },
  "GT": { mask: "+502-#-###-####", name: "Guatemala", example: "+502-1-234-5678" },
  "GW": { mask: "+245-#-######", name: "Guiné-Bissau", example: "+245-1-234567" },
  "GY": { mask: "+592-###-####", name: "Guiana", example: "+592-123-4567" },
  "HK": { mask: "+852-####-####", name: "Hong Kong", example: "+852-1234-5678" },
  "HN": { mask: "+504-####-####", name: "Honduras", example: "+504-1234-5678" },
  "HR": { mask: "+385-##-###-###", name: "Croácia", example: "+385-12-345-678" },
  "HT": { mask: "+509-##-##-####", name: "Haiti", example: "+509-12-34-5678" },
  "HU": { mask: "+36(###)###-###", name: "Hungria", example: "+36(123)456-789" },
  "ID": { mask: "+62(8##)###-####", name: "Indonésia", example: "+62(812)345-6789" },
  "IE": { mask: "+353(###)###-###", name: "Irlanda", example: "+353(123)456-789" },
  "IL": { mask: "+972-5#-###-####", name: "Israel", example: "+972-50-123-4567" },
  "IN": { mask: "+91(####)###-###", name: "Índia", example: "+91(9876)543-210" },
  "IQ": { mask: "+964(###)###-####", name: "Iraque", example: "+964(123)456-7890" },
  "IR": { mask: "+98(###)###-####", name: "Irã", example: "+98(123)456-7890" },
  "IS": { mask: "+354-###-####", name: "Islândia", example: "+354-123-4567" },
  "IT": { mask: "+39(###)####-###", name: "Itália", example: "+39(123)4567-890" },
  "JM": { mask: "+1(876)###-####", name: "Jamaica", example: "+1(876)123-4567" },
  "JO": { mask: "+962-#-####-####", name: "Jordânia", example: "+962-7-9012-3456" },
  "JP": { mask: "+81-##-####-####", name: "Japão", example: "+81-90-1234-5678" },
  "KE": { mask: "+254-###-######", name: "Quênia", example: "+254-123-456789" },
  "KG": { mask: "+996(###)###-###", name: "Quirguistão", example: "+996(123)456-789" },
  "KH": { mask: "+855-##-###-###", name: "Camboja", example: "+855-12-345-678" },
  "KI": { mask: "+686-##-###", name: "Quiribati", example: "+686-12-345" },
  "KM": { mask: "+269-##-#####", name: "Comores", example: "+269-12-34567" },
  "KN": { mask: "+1(869)###-####", name: "São Cristóvão e Névis", example: "+1(869)123-4567" },
  "KP": { mask: "+850-##-###-###", name: "Coreia do Norte", example: "+850-12-345-678" },
  "KR": { mask: "+82-##-###-####", name: "Coreia do Sul", example: "+82-10-1234-5678" },
  "KW": { mask: "+965-####-####", name: "Kuwait", example: "+965-1234-5678" },
  "KY": { mask: "+1(345)###-####", name: "Ilhas Cayman", example: "+1(345)123-4567" },
  "KZ": { mask: "+7(7##)###-##-##", name: "Cazaquistão", example: "+7(701)123-45-67" },
  "LA": { mask: "+856-##-###-###", name: "Laos", example: "+856-12-345-678" },
  "LB": { mask: "+961-##-###-###", name: "Líbano", example: "+961-12-345-678" },
  "LC": { mask: "+1(758)###-####", name: "Santa Lúcia", example: "+1(758)123-4567" },
  "LI": { mask: "+423(###)###-####", name: "Liechtenstein", example: "+423(123)456-7890" },
  "LK": { mask: "+94-##-###-####", name: "Sri Lanka", example: "+94-12-345-6789" },
  "LR": { mask: "+231-##-###-###", name: "Libéria", example: "+231-12-345-678" },
  "LS": { mask: "+266-#-###-####", name: "Lesoto", example: "+266-5-123-4567" },
  "LT": { mask: "+370(###)##-###", name: "Lituânia", example: "+370(123)45-678" },
  "LU": { mask: "+352(###)###-###", name: "Luxemburgo", example: "+352(123)456-789" },
  "LV": { mask: "+371-##-###-###", name: "Letônia", example: "+371-12-345-678" },
  "LY": { mask: "+218-##-###-###", name: "Líbia", example: "+218-12-345-678" },
  "MA": { mask: "+212-##-####-###", name: "Marrocos", example: "+212-12-3456-789" },
  "MC": { mask: "+377(###)###-###", name: "Mônaco", example: "+377(123)456-789" },
  "MD": { mask: "+373-####-####", name: "Moldávia", example: "+373-1234-5678" },
  "ME": { mask: "+382-##-###-###", name: "Montenegro", example: "+382-12-345-678" },
  "MG": { mask: "+261-##-##-#####", name: "Madagascar", example: "+261-12-34-56789" },
  "MH": { mask: "+692-###-####", name: "Ilhas Marshall", example: "+692-123-4567" },
  "MK": { mask: "+389-##-###-###", name: "Macedônia do Norte", example: "+389-12-345-678" },
  "ML": { mask: "+223-##-##-####", name: "Mali", example: "+223-12-34-5678" },
  "MM": { mask: "+95-##-###-###", name: "Mianmar", example: "+95-12-345-678" },
  "MN": { mask: "+976-##-##-####", name: "Mongólia", example: "+976-12-34-5678" },
  "MO": { mask: "+853-####-####", name: "Macau", example: "+853-1234-5678" },
  "MR": { mask: "+222-##-##-####", name: "Mauritânia", example: "+222-12-34-5678" },
  "MT": { mask: "+356-####-####", name: "Malta", example: "+356-1234-5678" },
  "MU": { mask: "+230-###-####", name: "Maurício", example: "+230-123-4567" },
  "MV": { mask: "+960-###-####", name: "Maldivas", example: "+960-123-4567" },
  "MW": { mask: "+265-#-####-####", name: "Maláui", example: "+265-9-1234-5678" },
  "MX": { mask: "+52(###)###-####", name: "México", example: "+52(55)1234-5678" },
  "MY": { mask: "+60-##-###-####", name: "Malásia", example: "+60-12-345-6789" },
  "MZ": { mask: "+258-##-###-###", name: "Moçambique", example: "+258-12-345-678" },
  "NA": { mask: "+264-##-###-####", name: "Namíbia", example: "+264-12-345-6789" },
  "NC": { mask: "+687-##-####", name: "Nova Caledônia", example: "+687-12-3456" },
  "NE": { mask: "+227-##-##-####", name: "Níger", example: "+227-12-34-5678" },
  "NG": { mask: "+234(###)###-####", name: "Nigéria", example: "+234(123)456-7890" },
  "NI": { mask: "+505-####-####", name: "Nicarágua", example: "+505-1234-5678" },
  "NL": { mask: "+31-##-###-####", name: "Países Baixos", example: "+31-12-345-6789" },
  "NO": { mask: "+47(###)##-###", name: "Noruega", example: "+47(123)45-678" },
  "NP": { mask: "+977-##-###-###", name: "Nepal", example: "+977-12-345-678" },
  "NR": { mask: "+674-###-####", name: "Nauru", example: "+674-123-4567" },
  "NU": { mask: "+683-####", name: "Niue", example: "+683-1234" },
  "NZ": { mask: "+64(###)###-###", name: "Nova Zelândia", example: "+64(21)123-456" },
  "OM": { mask: "+968-##-###-###", name: "Omã", example: "+968-12-345-678" },
  "PA": { mask: "+507-###-####", name: "Panamá", example: "+507-123-4567" },
  "PE": { mask: "+51(###)###-###", name: "Peru", example: "+51(123)456-789" },
  "PF": { mask: "+689-##-##-##", name: "Polinésia Francesa", example: "+689-12-34-56" },
  "PG": { mask: "+675(###)##-###", name: "Papua-Nova Guiné", example: "+675(123)45-678" },
  "PH": { mask: "+63(###)###-####", name: "Filipinas", example: "+63(123)456-7890" },
  "PK": { mask: "+92(###)###-####", name: "Paquistão", example: "+92(123)456-7890" },
  "PL": { mask: "+48(###)###-###", name: "Polônia", example: "+48(123)456-789" },
  "PS": { mask: "+970-##-###-####", name: "Palestina", example: "+970-12-345-6789" },
  "PT": { mask: "+351-##-###-####", name: "Portugal", example: "+351-12-345-6789" },
  "PW": { mask: "+680-###-####", name: "Palau", example: "+680-123-4567" },
  "PY": { mask: "+595(###)###-###", name: "Paraguai", example: "+595(123)456-789" },
  "QA": { mask: "+974-####-####", name: "Catar", example: "+974-1234-5678" },
  "RO": { mask: "+40-##-###-####", name: "Romênia", example: "+40-12-345-6789" },
  "RS": { mask: "+381-##-###-####", name: "Sérvia", example: "+381-12-345-6789" },
  "RU": { mask: "+7(###)###-##-##", name: "Rússia", example: "+7(123)456-78-90" },
  "RW": { mask: "+250(###)###-###", name: "Ruanda", example: "+250(123)456-789" },
  "SA": { mask: "+966-5-####-####", name: "Arábia Saudita", example: "+966-5-1234-5678" },
  "SB": { mask: "+677-###-####", name: "Ilhas Salomão", example: "+677-123-4567" },
  "SC": { mask: "+248-#-###-###", name: "Seicheles", example: "+248-1-234-567" },
  "SE": { mask: "+46(###)###-###", name: "Suécia", example: "+46(123)456-789" },
  "SG": { mask: "+65-####-####", name: "Singapura", example: "+65-1234-5678" },
  "SI": { mask: "+386-##-###-###", name: "Eslovênia", example: "+386-12-345-678" },
  "SK": { mask: "+421(###)###-###", name: "Eslováquia", example: "+421(123)456-789" },
  "SL": { mask: "+232-##-######", name: "Serra Leoa", example: "+232-12-345678" },
  "SM": { mask: "+378-####-######", name: "San Marino", example: "+378-1234-567890" },
  "SN": { mask: "+221-##-###-####", name: "Senegal", example: "+221-12-345-6789" },
  "SO": { mask: "+252-##-###-###", name: "Somália", example: "+252-12-345-678" },
  "SR": { mask: "+597-###-####", name: "Suriname", example: "+597-123-4567" },
  "SS": { mask: "+211-##-###-####", name: "Sudão do Sul", example: "+211-12-345-6789" },
  "ST": { mask: "+239-##-#####", name: "São Tomé e Príncipe", example: "+239-12-34567" },
  "SV": { mask: "+503-##-##-####", name: "El Salvador", example: "+503-12-34-5678" },
  "SY": { mask: "+963-##-####-###", name: "Síria", example: "+963-12-3456-789" },
  "SZ": { mask: "+268-##-##-####", name: "Essuatíni", example: "+268-12-34-5678" },
  "TD": { mask: "+235-##-##-##-##", name: "Chade", example: "+235-12-34-56-78" },
  "TG": { mask: "+228-##-###-###", name: "Togo", example: "+228-12-345-678" },
  "TH": { mask: "+66-##-###-####", name: "Tailândia", example: "+66-12-345-6789" },
  "TJ": { mask: "+992-##-###-####", name: "Tajiquistão", example: "+992-12-345-6789" },
  "TL": { mask: "+670-###-#####", name: "Timor-Leste", example: "+670-123-45678" },
  "TM": { mask: "+993-#-###-####", name: "Turcomenistão", example: "+993-1-234-5678" },
  "TN": { mask: "+216-##-###-###", name: "Tunísia", example: "+216-12-345-678" },
  "TO": { mask: "+676-###-####", name: "Tonga", example: "+676-123-4567" },
  "TR": { mask: "+90(###)###-####", name: "Turquia", example: "+90(123)456-7890" },
  "TT": { mask: "+1(868)###-####", name: "Trinidad e Tobago", example: "+1(868)123-4567" },
  "TV": { mask: "+688-###-###", name: "Tuvalu", example: "+688-123-456" },
  "TW": { mask: "+886-#-####-####", name: "Taiwan", example: "+886-9-1234-5678" },
  "TZ": { mask: "+255-##-###-####", name: "Tanzânia", example: "+255-12-345-6789" },
  "UA": { mask: "+380(##)###-##-##", name: "Ucrânia", example: "+380(12)345-67-89" },
  "UG": { mask: "+256(###)###-###", name: "Uganda", example: "+256(123)456-789" },
  "US": { mask: "+1(###)###-####", name: "Estados Unidos", example: "+1(212)123-4567" },
  "UY": { mask: "+598-#-###-##-##", name: "Uruguai", example: "+598-9-123-45-67" },
  "UZ": { mask: "+998-##-###-####", name: "Uzbequistão", example: "+998-12-345-6789" },
  "VA": { mask: "+379-####-######", name: "Vaticano", example: "+379-1234-567890" },
  "VC": { mask: "+1(784)###-####", name: "São Vicente e Granadinas", example: "+1(784)123-4567" },
  "VE": { mask: "+58(###)###-####", name: "Venezuela", example: "+58(123)456-7890" },
  "VG": { mask: "+1(284)###-####", name: "Ilhas Virgens Britânicas", example: "+1(284)123-4567" },
  "VI": { mask: "+1(340)###-####", name: "Ilhas Virgens Americanas", example: "+1(340)123-4567" },
  "VN": { mask: "+84(###)####-###", name: "Vietnã", example: "+84(123)4567-890" },
  "VU": { mask: "+678-###-####", name: "Vanuatu", example: "+678-123-4567" },
  "WS": { mask: "+685-##-####", name: "Samoa", example: "+685-12-3456" },
  "YE": { mask: "+967-###-###-###", name: "Iêmen", example: "+967-123-456-789" },
  "ZA": { mask: "+27-##-###-####", name: "África do Sul", example: "+27-12-345-6789" },
  "ZM": { mask: "+260-##-###-####", name: "Zâmbia", example: "+260-12-345-6789" },
  "ZW": { mask: "+263-#-######", name: "Zimbábue", example: "+263-1-234567" }
};

// Função para extrair código do país da máscara
const extractCountryCode = (mask: string): string => {
  const match = mask.match(/^\+(\d+)/);
  return match ? `+${match[1]}` : '';
};

// Função para gerar placeholder a partir da máscara
const generatePlaceholder = (mask: string): string => {
  return mask.replace(/#+/g, (match) => '0'.repeat(match.length));
};

interface InternationalPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  countryValue?: string;
  onCountryChange?: (countryCode: string) => void;
}

export function InternationalPhoneInput({
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
  countryValue = "BR",
  onCountryChange
}: InternationalPhoneInputProps) {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>(countryValue);
  const [phoneNumber, setPhoneNumber] = useState(value);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    if (onCountryChange) {
      onCountryChange(countryCode);
    }
    
    // Limpar o número quando trocar de país
    setPhoneNumber("");
    onChange("");
  };

  const handlePhoneChange = (newValue: string) => {
    setPhoneNumber(newValue);
    
    // Combinar código do país + número para retornar o valor completo
    const countryCode = extractCountryCode(phoneMasks[selectedCountry as keyof typeof phoneMasks].mask);
    const fullNumber = countryCode + newValue;
    onChange(fullNumber);
  };

  const currentCountryData = phoneMasks[selectedCountry as keyof typeof phoneMasks];
  const countryCode = extractCountryCode(currentCountryData.mask);
  const phonePlaceholder = generatePlaceholder(currentCountryData.mask.replace(countryCode, ''));

  return (
    <div className="space-y-2">
      <Label className="text-[#2c3e50]">{t('phone')}</Label>
      
      <div className="grid grid-cols-5 gap-2">
        {/* Dropdown de países */}
        <div className="col-span-2">
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {Object.entries(phoneMasks).map(([code, data]) => (
                <SelectItem key={code} value={code} className="text-sm">
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{data.name}</span>
                    <span className="text-[#ff9b33] ml-2 flex-shrink-0">
                      {extractCountryCode(data.mask)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Campo DDI (não editável) */}
        <div className="col-span-1">
          <Input
            value={countryCode}
            readOnly
            className="border border-gray-200 bg-gray-100 text-center text-sm cursor-not-allowed"
            tabIndex={-1}
          />
        </div>

        {/* Campo de número de telefone */}
        <div className="col-span-2">
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={phonePlaceholder}
            className={`border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] text-sm ${className}`}
            required={required}
          />
        </div>
      </div>
      
      {/* Exemplo de formato */}
      <div className="text-xs text-[#7f8c8d] mt-1">
        <span>{t('example') || 'Exemplo'}: {currentCountryData.example}</span>
      </div>
    </div>
  );
}