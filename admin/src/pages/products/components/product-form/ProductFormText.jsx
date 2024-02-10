import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";

const ProductFormText = ({
  control,
  name,
  placeholder,
  inputType = "text",
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">{placeholder}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={inputType} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default ProductFormText;
