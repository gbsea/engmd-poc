export default () => ({
  engagedmd: {
    practiceId: process.env["ENGAGEDMD_PRACTICE"]!,
    apiBaseUrl: process.env["ENGAGEDMD_API_BASE_URL"]!,
    authRedirectUrl: process.env["ENGAGEDMD_AUTH_CALLBACK_URL"]!,
    apiUsername: process.env["ENGAGEDMD_USERNAME"]!,
    apiPassword: process.env["ENGAGEDMD_PASSWORD"]!,
  },
});
