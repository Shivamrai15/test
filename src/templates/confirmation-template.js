export const getConfirmationTemplate = (confirmationEmail) => {
  return `
        <pre>Click on the link to confirm your payment</pre>
        <a href="${confirmationEmail}" > Click here </a>
    `;
};
