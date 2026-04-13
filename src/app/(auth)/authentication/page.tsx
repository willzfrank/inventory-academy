import AuthLayout from "@/components/layout/AuthLayout";
import OneTokenForm from "@/components/auth/OneTokenForm";

export default function AuthenticationPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-[400px]">
        <h1 className="text-[32px] font-bold leading-[48px] text-neutral-black1">
          Authentication
        </h1>
        <p className="mt-2 text-base font-medium leading-6 text-neutral-black3">
          Enter your OneToken details to log in
        </p>
        <div className="mt-9">
          <OneTokenForm />
        </div>
      </div>
    </AuthLayout>
  );
}
