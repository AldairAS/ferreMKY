"use client";
import styles from "./Sign-in.module.css";
import { login } from "@/services/client/auth";
import { useFormState } from "react-dom";

export default function page() {
  const [formState, formAction] = useFormState(login, undefined);
  return (
    <div className={styles.loginBackground}>
   
      <div className={styles.loginForm}>
      <div className="flex flex-col ml-[50px]">
        <div className={styles.textOneLogin}>ABRIENDO PUERTAS A TU </div>
        <div  className={styles.textTwoLogin}>PROYECTO</div>
      </div>
        <form className={styles.loginContainer} action={formAction}>
          
          <div className="flex items-center flex-col">
            <div className={styles.loginLogo}></div>
            <div className={styles.loginLogoText}>HARDWARE STORE</div>
          </div>

          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[5px]">
                          <div className="flex flex-col gap-[3px]">
              <label htmlFor="email" className="align-text-left w-[100%]">
                Email
              </label>
              <input name="email" className={styles.inputField} />
            </div>

            <div className="flex flex-col gap-[3px]">
              <label htmlFor="password" className="align-text-left w-[100%] ">
                Password
              </label>
              <input
                type="password"
                name="password"
                className={styles.inputField}
              />
            </div>
            </div>


            <div className="w-[100%] flex justify-center">
              <button className={styles.submitButton}>ACCEDER</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
