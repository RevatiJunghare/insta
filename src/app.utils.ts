const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/

const PASSWORD_RULE_MESSAGE = "Password should have 1 uppercase, lowercase letter along with a number and special character."


export const REGEX = {
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE
}