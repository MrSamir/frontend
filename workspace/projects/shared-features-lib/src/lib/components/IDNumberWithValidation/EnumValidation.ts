
export enum EnumValidation {

    pattern_mobile_number = "05[0-9]{8}",
    pattern_full_mobile_number = "05[0-9]{8}",
    pattern_ksa_mobile_number = "^((0|9)|(96{1,2})|(9665)|(05)|(((05)|(9665))\\d{1,8}))$",
    //"^(00|0|)?(966|5|)(\d{9})$",
    pattern_email = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    pattern_nin_iqama = "^[1|2]{1}[0-9]{9}$",
    pattern_iqama = "^2[0-9]{9}$",
    pattern_nationalId = "^1[0-9]{9}$",
    pattern_english_any_char_no_space = "^[A-Za-z0-9_]*$",
    pattern_english_any_char_with_space = "^[A-Za-z0-9_ ]*$",
    pattern_arabic_any_char_with_space = "^[0-9 ء-ي]+$",
    pattern_arabic_english_any_char_with_space_without_numbers = "^[A-Za-z_ ء-ي]+$",
    pattern_arabic_any_char_with_space_without_numbers = "^[ء-ي]+$",
    pattern_english_any_char_no_space_no_underscore = "^[A-Za-z0-9]*$",
    pattern_english_any_char = "^[A-Za-z0-9_@\\\/.:#&!$%^&*()+-s\\s]*$",
    pattern_arabic_number_forwardslash_char = "^[0-9 \\\/s\\s ء-ي]*$",
    pattern_number = "^[0-9]*$",
    // pattern_number="^(!(0)|([0-9]))*$",
    pattern_Url = "http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?",
    pattern_HostName = "^(/)|((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9]))$",
  
    pattern_IpAddress = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$",
    //any change in this pattern should reflect in java
    pattern_number_attribute_validation = "^[0-9]*$",
    pattern_Length_attribute_validation = "[1-9][0-9]{0,2}$",
    pattern_time = "^(?:(?:([01]?\\d|2[0-3]):)?([0-5]?\\d):)?([0-5]?\\d)$",
    pattern_english_no_space = "^[A-Za-z0-9_]*$",
    pattern_second = "^([0-9]{1,3}){1}(\\.[0-9]{1,2})?$",
    pattern_Values = "^.*[^,]$",
    pattern_number_starts_with_3 = "^3[0-9]*$",
    pattern_number_starts_with_2 = "^2[0-9]*$",
    pattern_number_starts_with = "^2[1-9]*$",
    //any change in this patern should reflect in java
    pattern_english_char_date = "^[ymd]{8}$",
    pattern_decimal_values = "^([0-9]{1,10})$|^([0-9]{1,10})(.)[0-9]{1,4}$",
    pattern_decimal_values_startsBy_1 = "^(?!$)\\d{0,10}(?:\\.\\d{1,2})?$",
    pattern_gregorian_date = "^((((1(8|9)\\d{2})|((20)[0-3]\\d)))(-|\/)((0{0,1}[1-9])|(1[0-2]))(-|\/)(3[0-1]|[0-2]{0,1}[1-9]|[1-2][0-9]))$",
    pattern_percentage = "(^100(\\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\\.[0-9]{1,2})?$)",
    pattern_date = "^((((\\d{4})|((20)[0-3]\\d)))(-|\/)((0{0,1}[1-9])|(1[0-2]))(-|\/)(3[0-1]|[0-2]{0,1}[1-9]|[1-2][0-9]))$",
    pattern_iban = "^SA\\d{4}[A-Z0-9]{18}$",
    pattern_WaqfResponserPortion = "^[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$",
    pattern_assetsize = "^([1-9]|[1-9][0-9]{1,8}|1000000000)$"
    //pattern_CombinedWaqfResponserPortion = "(^[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$)|(^([0-9]{1,10})$|^([0-9]{1,10})(.)[0-9]{1,4}$)"
  }
  