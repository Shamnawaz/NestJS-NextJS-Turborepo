import { LoginForm } from "@/components/auth/login-form"
import { BACKEND_URL } from "@/lib/constants"

export default function LoginPage() {
  return (
    <div className="bg-black text-white bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
        <a className="text-2xl bg-blue-700" href={`${BACKEND_URL}/auth/google/login`}>Login With Google</a>
      </div>
    </div>
  )
}
