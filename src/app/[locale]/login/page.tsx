import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/auth/login-form";
import { Link } from "@/i18n/routing";

export default async function LoginPage() {
  const t = await getTranslations("auth");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">{t("login")}</h1>
        <LoginForm />
        <p className="text-center text-sm">
          <Link href="/signup" className="text-blue-600 hover:underline">
            {t("noAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
}
