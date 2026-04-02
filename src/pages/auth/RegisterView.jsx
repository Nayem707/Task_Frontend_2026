import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ROUTES } from "../../utils/constants";
import { emailPattern, passwordRules } from "../../utils/validators";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { register as registerUser } from "../../features/auth/authAPI";

function RegisterView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agree: true,
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await dispatch(registerUser({ email, password })).unwrap();
      toast.success("Account created");
      navigate(ROUTES.FEED, { replace: true });
    } catch (error) {
      toast.error(error || "Registration failed.");
    }
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
            src="/images/registration.png"
            alt="Registration illustration"
            className="w-full max-w-3xl"
            loading="lazy"
          />
        </div>

        <section className="app-card mx-auto w-full max-w-md p-6 sm:p-8">
          <img src="/images/logo.svg" alt="Buddy Script" className="mb-8 h-8" />
          <p className="mb-1 text-sm text-[#6b7a92]">Get Started Now</p>
          <h1 className="mb-8 text-2xl font-semibold text-[#112032]">
            Registration
          </h1>

          <button
            type="button"
            className="mb-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#dbe5f2] bg-white text-sm font-medium text-[#21334d]"
          >
            <img src="/images/google.svg" alt="Google" className="h-4 w-4" />
            Register with google
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

            <Input
              label="Repeat Password"
              type="password"
              placeholder="********"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match.",
              })}
            />

            <label className="flex items-start gap-2 text-sm text-[#54627a]">
              <input
                type="checkbox"
                className="mt-1"
                {...register("agree", { required: true })}
              />
              I agree to terms & conditions
            </label>
            {errors.agree ? (
              <p className="text-xs text-red-500">
                You must agree to continue.
              </p>
            ) : null}
            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b7a92]">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-semibold text-[#377DFF]">
              Login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default RegisterView;
