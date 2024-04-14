"use client";

import { login } from "@/services/client/auth";
import { useFormState } from "react-dom";

export default function page() {
  const [formState, formAction] = useFormState(login, undefined);
  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button>Sign In</button>
    </form>
  );
}
