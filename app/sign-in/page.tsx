"use client";
import styles from "./Sign-in.module.css";
import { login } from "@/services/client/auth";
import { useFormState } from "react-dom";

export default function page() {
  const [formState, formAction] = useFormState(login, undefined);
  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginForm}>
        <div className="flex flex-col max-lg:mb-[20px] max-md:h-[170px] lg:h-[350px] h-[200px] lg:justify-between justify-center items-center">
          <div className="flex flex-col lg:text-left text-center">
            <div className={styles.textOneLogin}>ABRIENDO PUERTAS A TU </div>
            <div className={styles.textTwoLogin}>PROYECTO</div>
          </div>
          <div className="flex flex-col w-[100%] lg:items-end items-center">
            <div className="flex flex-col lg:text-right text-center">
              <div className={styles.textOneLogin}>UN CLICK A LA VEZ </div>
            </div>
            <div className="max-lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 75 75"
                fill="none"
              >
                <path
                  d="M67.179 0H28.0742V9.38517H58.9795L0 68.3647L6.63531 75L65.6148 16.0205V46.9258H75V7.82097C75 3.51005 71.4931 0 67.179 0Z"
                  fill="#FEFEFE"
                />
              </svg>
            </div>
          </div>
        </div>
        <form className={styles.loginContainer} action={formAction}>
          <div className="flex items-center flex-col">
            <div className={styles.loginLogo}></div>
            <div className={styles.loginLogoText}>HARDWARE STORE</div>
          </div>

          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[5px]">
              <div className="flex flex-col gap-[3px]">
                <label
                  htmlFor="email"
                  className="align-text-left w-[100%] text-[13px]"
                >
                  Email
                </label>
                <input
                  name="email"
                  placeholder="user@mail.com"
                  className={styles.inputField}
                />
                {formState?.errors && formState.errors.email && (
                  <p className={styles.error}>{formState.errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-[3px]">
                <label
                  htmlFor="password"
                  className="align-text-left w-[100%] text-[13px]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="*********"
                  className={styles.inputField}
                />
                {formState?.errors && formState.errors.password && (
                  <p className={styles.error}>{formState.errors.password}</p>
                )}
              </div>
            </div>

            <div className="w-[100%] flex justify-center flex-col">
              <button className={styles.submitButton}>ACCEDER</button>
              <p className="text-red-400 text-right pt-[5px]">
                {formState?.message && formState.message}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
