import { getTranslations } from "next-intl/server";
import { SignupForm } from "@/components/auth/signup-form";
import { Link } from "@/i18n/routing";

export default async function SignupPage() {
  const t = await getTranslations("auth");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">{t("signup")}</h1>
        <SignupForm />
        <p className="text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            {t("hasAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
}
