/**
 * Inform the user that an error occurred
 * @param e
 */
export const notifyError = (e: Error) => {
  alert(e.message);
  console.error(e);
};
