let currentCode = null;

export function setCode(code) {
    currentCode = code;
    console.log("PAIR CODE:", code);
}

export function getCode() {
    return currentCode;
}