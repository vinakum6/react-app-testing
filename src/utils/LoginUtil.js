import sha512 from '../../node_modules/js-sha512';

export const salt = () => {
    let length = Math.random();
    let result  = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const encryptPasswordWithSalt = (password,salt) => {
    if(password!==''){
        let hashedPassword = sha512(sha512(password)); 
        let hashedSalt = sha512(salt);
        password = sha512(hashedSalt+hashedPassword);
    }
    return password;
}

export const encryptPassword = (password) => {
    if(password!==''){
        password = sha512(sha512(password));
    }
    return password;    
} 
