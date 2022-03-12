import { createAction } from "@reduxjs/toolkit";

export const setEmails = createAction<string[]>("set-emails");
