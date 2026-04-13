import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-[360px]">
        <h1 className="text-[32px] font-bold font-inter leading-[48px] text-neutral-black1">
          User Login
        </h1>
        <p className="mt-2 text-base font-medium leading-6 text-neutral-black3 font-inter">
          Login with your AD credentials to continue
        </p>
        <div className="mt-9">
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
}
