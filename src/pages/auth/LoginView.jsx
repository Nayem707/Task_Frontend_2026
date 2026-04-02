import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ROUTES } from "../../utils/constants";
import { emailPattern, passwordRules } from "../../utils/validators";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

function LoginView() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.FEED;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async () => {
    toast.success("Logged in successfully");
    navigate(from, { replace: true });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <img
        src="/images/shape1.svg"
        alt=""
        className="pointer-events-none absolute left-0 top-0 w-52 opacity-80"
      />
      <img
        src="/images/shape2.svg"
        alt=""
        className="pointer-events-none absolute right-0 top-16 w-52 opacity-80"
      />
      <img
        src="/images/shape3.svg"
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/3 w-40 opacity-80"
      />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
        <div className="hidden lg:block">
          <img
            src="/images/login.png"
            alt="Login illustration"
            className="w-full max-w-3xl"
            loading="lazy"
          />
        </div>

        <section className="app-card mx-auto w-full max-w-md p-6 sm:p-8 bg-gray-50 rounded-lg">
          <img src="/images/logo.svg" alt="Buddy Script" className="mb-8 h-8" />
          <p className="mb-1 text-sm text-[#6b7a92]">Welcome back</p>
          <h1 className="mb-8 text-2xl font-semibold text-[#112032]">
            Login to your account
          </h1>

          <button
            type="button"
            className="mb-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#dbe5f2] bg-white text-sm font-medium text-[#21334d]"
          >
            <img src="/images/google.svg" alt="Google" className="h-4 w-4" />
            Or sign-in with google
          </button>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="email"
              placeholder="name@email.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required.",
                pattern: emailPattern,
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="********"
              error={errors.password?.message}
              {...register("password", passwordRules)}
            />

            <Button type="submit" className="h-11 w-full">
              Login now
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b7a92]">
            Don&apos;t have an account?{" "}
            <Link to={ROUTES.REGISTER} className="font-semibold text-[#377DFF]">
              Create New Account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default LoginView;
