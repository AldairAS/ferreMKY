"use client";
import styles from "./Sign-in.module.css";
import { login } from "@/services/client/auth";
import { useFormState } from "react-dom";

export default function page() {
  const [formState, formAction] = useFormState(login, undefined);
  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginForm}>
        <form className={styles.loginContainer} action={formAction}>
          <div className="flex items-center flex-col">
            <div className={styles.loginLogo}></div>
            <div className={styles.loginLogoText}>HARDWARE STORE</div>
          </div>

          <div className={styles.TabsList}>
            <div className="w-[20px] border-b-[1px] border-r-[1px] border-white h-[30px] rounded-br mr-[-1px]"></div>
            <div className="w-[20%] border-t-[1px] border-x-[1px] border-white h-[90%] mb-[4px] flex justify-center items-center rounded-t-[10px]  ">Sign-in</div>
  <div className="flex-grow border-b-[1px] border-l-[1px] border-white h-[30px] rounded-bl ml-[-1px]"></div>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="email" className="align-text-left w-[100%]">
                Email
              </label>
              <input name="email" className={styles.inputField} />
            </div>

            <div className="flex flex-col gap-[10px]">
              <label htmlFor="password" className="align-text-left w-[100%] ">
                Password
              </label>
              <input
                type="password"
                name="password"
                className={styles.inputField}
              />
            </div>

            <div className="w-[100%] flex justify-center">
              <button className={styles.submitButton}>Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
