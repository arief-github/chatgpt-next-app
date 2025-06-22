function getFirstTwoCapitalLetters(str?: string | null) {
    const match = (str || "").match(/[A-Z]/g);
    return match ? match.slice(0, 2).join("") : "GT";
}

export default getFirstTwoCapitalLetters;