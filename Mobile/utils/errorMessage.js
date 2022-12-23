export function errorMessage(status, errorMessage, cause) {
    let message = "";
    switch (status) {
        case 400:
            message += errorMessage;
            break;
        case 401:
            message += "Autorisation requise !";
            break;
        case 403:
            message += "Vous n'avez pas la permission.";
            break;
        case 404:
            message += `${cause} introuvable.`;
            break;
        case 500:
            message += "Une erreur est survenue, veuillez réessayer.";
            break;
    }

    return message;
}