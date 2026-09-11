import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark">JC</div>
          <div>
            <strong>JaffnaCityPMS</strong>
            <span>Hotel PMS</span>
          </div>
        </div>
        <h1>Sign in to your account</h1>
        <p>JaffnaCityPMS — Property Management System</p>
        <Suspense>
          <LoginForm />
        </Suspense>
        <div className="login-hint">
          Demo accounts use password <b>password123</b> — e.g. <b>suvithan.lk@gmail.com</b>
        </div>
      </div>
    </div>
  );
}
