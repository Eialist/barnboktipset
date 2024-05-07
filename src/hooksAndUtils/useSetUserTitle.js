export const useSetUserTitle = (user) => {
    if (user.points < 500) {
        return "Newbie";
    } else if (user.points >= 501 && user.points <= 1500) {
        return "Läsaren";
    } else if (user.points >= 1501 && user.points <= 2500) {
        return "Sidvändaren";
    } else if (user.points >= 2501 && user.points <= 3500) {
        return "Bokmästaren";
    } else if (user.points >= 3501 && user.points <= 4500) {
        return "Läshjälten";
    } else if (user.points >= 4501 && user.points <= 5500) {
        return "Berättelsebossen";
    } else if (user.points >= 5501 && user.points <= 6500) {
        return "Läslegenden";
    } else if (user.points >= 6501 && user.points <= 7500) {
        return "Bokhärskaren";
    }
};