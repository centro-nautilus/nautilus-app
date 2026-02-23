import type { IconType } from "react-icons";


export const formatRut = (value: string) => {

  const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (!clean) return "";

  if (clean.length <= 1) return clean;

  const dv = clean.slice(-1);
  const body = clean.slice(0, -1);

  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formattedBody}-${dv}`;
};

export const validateRut = (rut: string) => {
  if (!rut || rut.length < 8) return false;

  const clean = rut.replace(/\./g, "").replace("-", "").toUpperCase();
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let sum = 0;
  let mul = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }

  const res = 11 - (sum % 11);
  const expectedDv = res === 11 ? "0" : res === 10 ? "K" : res.toString();

  return dv === expectedDv;
};


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  icon: IconType;
  error: string | undefined;
  alternativeText?: string;
}

export const Input = ({ id, placeholder, icon: Icon, error, alternativeText, onChange, ...props }: InputProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isRut = id.toLowerCase().includes("rut");
    const isPhone = id.toLowerCase().includes("tel") || id.toLowerCase().includes("phone");

    if (isRut) {
      e.target.value = formatRut(e.target.value);
    }

    if (isPhone) {
      // 1. Limpiamos: dejamos solo números
      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
      // 2. Cortamos a 8 caracteres
      e.target.value = onlyNums.slice(0, 8);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-1 flex-1">
      <div
        className={`flex items-center gap-2 px-3 md:px-5 border-3 rounded-xl transition-colors focus-within:border-blue-500 
        ${error ? "border-red-400" : "border-gray-200"}`}
      >
        <div className="flex items-center gap-2 text-gray-400 shrink-0 py-3 md:py-5">
          <Icon className="size-6 md:size-8" />

          {alternativeText && (
            <span className="text-gray-500 text-base md:text-xl font-medium">
              {alternativeText}
            </span>
          )}

          {alternativeText && (
            <div className="h-6 w-px bg-gray-300 ml-1" />
          )}
        </div>

        <input
          {...props}
          id={id}
          type={id.toLowerCase().includes("rut") || id.toLowerCase().includes("tel") ? "text" : props.type}
          placeholder={placeholder}
          onChange={handleChange}
          // Usamos maxLength nativo para mayor seguridad visual
          maxLength={
            id.toLowerCase().includes("rut") ? 12 :
              (id.toLowerCase().includes("tel") || id.toLowerCase().includes("phone")) ? 8 :
                undefined
          }
         className="w-full py-3 md:py-5 text-base md:text-xl focus:outline-none bg-transparent 
           autofill:shadow-[inset_0_0_0px_1000px_white] 
           dark:autofill:shadow-[inset_0_0_0px_1000px_white]"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm md:text-lg ml-1 font-medium italic">
          {error}
        </p>
      )}
    </div>
  );
};