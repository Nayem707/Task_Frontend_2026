import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ROUTES } from "../../utils/constants";
import { emailPattern, passwordRules } from "../../utils/validators";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { login } from "../../features/auth/authAPI";

function LoginView() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || ROUTES.FEED;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error || "Login failed.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <img
        src="/images/shape1.svg"
        alt=""
        className="pointer-events-none absolute top-0 left-0 w-32 opacity-80 sm:w-40 md:w-52"
      />
      <img
        src="/images/shape2.svg"
        alt=""
        className="pointer-events-none absolute top-8 right-0 w-32 opacity-80 sm:top-12 sm:w-40 md:top-16 md:w-52"
      />
      <img
        src="/images/shape3.svg"
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/3 w-24 opacity-80 sm:w-32 md:w-40"
      />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-6 px-3 py-6 sm:gap-8 sm:px-4 sm:py-10 lg:grid-cols-[1fr_420px]">
        <div className="hidden lg:block">
          <img
            src="/images/login.png"
            alt="Login illustration"
            className="w-full max-w-3xl"
            loading="lazy"
          />
        </div>

        <section className="app-card mx-auto w-full max-w-md rounded-lg bg-gray-50 p-4 sm:p-6 md:p-8">
          <img
            src="/images/logo.svg"
            alt="Buddy Script"
            className="mb-6 h-6 sm:mb-8 sm:h-8"
          />
          <p className="mb-1 text-xs text-[#6b7a92] sm:text-sm">Welcome back</p>
          <h1 className="mb-6 text-xl font-semibold text-[#112032] sm:mb-8 sm:text-2xl">
            Login to your account
          </h1>

          <button
            type="button"
            className="mb-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#dbe5f2] bg-white text-xs font-medium text-[#21334d] sm:mb-6 sm:h-11 sm:text-sm"
          >
            <img
              src="/images/google.svg"
              alt="Google"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            />
            Or sign-in with google
          </button>

          <form
            className="space-y-3 sm:space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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

            <Button
              type="submit"
              className="h-10 w-full sm:h-11"
              disabled={loading}
            >
              {loading ? "Logging in…" : "Login now"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-[#6b7a92] sm:mt-6 sm:text-sm">
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
