/**
 * Confirms if the passed value exists.
 * @param {any} value 
 */
export const required = value => (value !== undefined ? undefined : 'This field is required');

/**
 * Confirms if new password match with confirm new password for current logedin user
 * @param {any} value 
 */
export const confirmNewPasswordForCurrentUserValidator = (value, allValues) => {
    return value && value === allValues.newPassword ? undefined : 'Passwords do not match. Kindly enter again.'
}

/**
 * Confirms if Product Key is valid UUID V4 or not.
 * @param {any} value 
 */
export const isValidUUIDV4 = (value) => {
    return value && !/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) ? 'Invalid Product Key' : undefined;
}

/**
 * Confirms if password match with confirm password for user
 * @param {any} value 
 */
export const confirmPasswordForUserValidator = (value, allValues) => {
    return value && value === allValues.password ? undefined : 'Passwords do not match. Kindly enter again.'
}

/**
 * Confirms if the passed value is a valid email address.
 * @param {string} value 
 */
export const email = value =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined;
  
/**
 * Confirms if the passed value is valid password or not.
 * Password should be of 8 to 64 characters which should comprise of at least one number,
 * one special character, one upper case and one lower case character
 * @param {string} value 
 */
export const checkPasswordForPolicy = (value) => {
    let passwordPolicyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/i;
    return value && !passwordPolicyRegex.test(value)
  ? 'Please enter a valid Password. Refer password policy for details.'
  : undefined;
}

/**
 * Confirms if the passed value is a integer
 * @param {string} value 
 */
export const numeric = value =>
    value && /[^0-9 ]/i.test(value)
        ? 'Only numbers are allowed'
        : undefined;

/**
 * Confirms if the passed value is number
 * @param {string} value 
 */
export const number = value => {
    if(!value || value === ""){
        return value === 0 ? undefined : 'Only numbers allowed';
    }else{
        let result = Number(value);
        return isNaN(result) ? 'Only numbers allowed' : undefined;
    }
}

/**
 * Confirms if the passed value is a number but not 0
 * @param {string} value 
 */
export const numericNonZeroAtStart = value =>
    value && /^[^1-9][0-9]*$/i.test(value)
        ? 'Only zero number is not allowed'
        : undefined;

/**
 * Confirms if the passed value is an alphabet
 * @param {string} value 
 */
export const alphabets = value =>
    value && /[^a-zA-Z ]/i.test(value)
        ? 'Only alphabets are allowed'
        : undefined;

/**
 * Confirms if the passed value is alpha-numeric.
 * @param {string} value 
 */
export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters are allowed'
        : undefined;

/**
 * Confirms if the passed value is alpha-numeric without any spaces.
 * @param {string} value 
 */
export const alphaNumericNoSpace = value =>
    value && /[^-_a-zA-Z0-9]/i.test(value)
        ? 'Only alphanumeric characters without spaces are allowed'
        : undefined;


/**
 * Confirms if the passed value is alpha-numeric and contains '-', '.' or '_' without any spaces.
 * @param {string} value 
 */
export const validName = value =>
value && /[^-_.:a-zA-Z0-9]/i.test(value)
    ? 'Only alphanumeric characters, "-" , "_", and "." without spaces are allowed'
    : undefined;

/**
 * Confirms if the passed value is without any spaces.
 * @param {string} value 
 */
export const noSpace = value =>
    value && /^((?!.*[\s]))/i.test(value)
        ? undefined : 'No spaces allowed';

/**
 * Confirms if the passed value is a valid username
 * @param {string} value 
 */
export const username = value =>
    value && /[0-9A-Za-z@._=%-]/i.test(value)
        ? 'Only alphanumeric or one of (-_.) characters without spaces are allowed'
        : undefined;

/**
 * Confirms if the passed value is a valid phone number.
 * @param {string} value 
 */
export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined;

/**
 * Confirms if the passed value is a valid hostname
 * @param {string} value 
 */
export const hostname = value => 
    value && !/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/gm.test(value)
    ? 'Invalid hostname'
    : undefined;
    

/**
 * Confirms if the passed value is a valid Subnet address  in
 * CIDR format or not
 * @param {string} value 
 */
export const subnetWithCIDRFormat = value => 
    value && !/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$/gm.test(value)
        ? 'Invalid Subnet Format'
        : undefined;

/**
 * Confirms if the passed value is a valid IP address
 * @param {string} value 
 */
export const ipAddress = value => 
    value && !/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gm.test(value)
        ? 'Invalid IP Address'
        : undefined;
        
/**
 * Confirms if the passed value is a valid IPv6 CIDR
 * @param {string} value 
 */
export const ipv6CIDRAddress = value => 
value && !/((^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$))/gm.test(value)
    ? 'Invalid IPv6 Address'
    : undefined;

/**
 * Confirms if the passed value is a valid IPv4 CIDR
 * @param {string} value 
 */
export const ipv4CIDRAddress = value => 
value && !/((^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$))/gm.test(value)
    ? 'Invalid IPv4 Address'
    : undefined;
     
/**
 * Confirms if the passed value is a valid ipv4 address
 * @param {string} value 
 */
export const isIPv4Address = (value) => {
    if (value) {
        const octets = String(value).split('.');
        return Array.isArray(octets) && octets.length == 4 && Number(octets[0]) <= 255 && Number(octets[1]) <= 255
            && Number(octets[2]) <= 255 && Number(octets[3]) <= 255;
    }
    return false;
}

/**
 * Confirms if the passed value is a valid IP address or a hostname
 * @param {string} value 
 */
export const hostnameOrIPAddress = (value) => {
    if(hostname(value) === undefined ){
        return undefined;
    } else{
        const isIPAddress = ipAddress(value) == undefined;
        const isIPv6CIDRAddress = ipv6CIDRAddress(value) == undefined;
        const isIPv4CIDRAddress = ipv4CIDRAddress(value) == undefined;
        return (isIPAddress || isIPv6CIDRAddress || isIPv4CIDRAddress) ? undefined : 'Invalid Hostname or IP Address';
    } 
    
}

/**
 * Confirms if the passed values have ip range
 * @param {string} value 
 */
export const ipRangeCheck = (value) => {
    if(value){
        let arrIp = value.split('-');
        let isIPAddress1,isIPAddress2
        if(arrIp.length !== 2){
            return 'Two values required for start and end range'
        }else{
            isIPAddress1 = ipAddress(arrIp[0]) == undefined;
            isIPAddress2 = ipAddress(arrIp[1]) == undefined;
        }
        return (!isIPAddress1 && !isIPAddress2) ? 'Invalid IP Address' : undefined;
    }
}


/**
 * Confirms if the passed values are valid IP addresses or hostnames
 * @param {string} addresses 
 */
export const hostnamesOrIPAddresses = (addresses) => {
    if (addresses && addresses != '') {
        let values = [ addresses ];
        if (addresses.includes(',')) {
            values = addresses.split(',');
        } else if (addresses.includes(';')) {
            values = addresses.split(';');
        } else {
            values = addresses.split(' ');
        }
        
        const validations = values && values.map(value => {
            const isHostnameOrIPAddress = hostnameOrIPAddress(value.trim());
            return isHostnameOrIPAddress != undefined
                ? 'Invalid Hostname or IP Address'
                : undefined;
        });
    
        return validations.find(validation => validation != undefined) != null ? 'Invalid Hostnames or IP Addresses' : undefined;
    }
} 
    

/**
 * Confirms if the passed value is a valid hostname
 * @param {string} value 
 */
export const domainName = value => 
    value && !/^((http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/i.test(value)
        ? 'Invalid Domain Name'
        : undefined;
