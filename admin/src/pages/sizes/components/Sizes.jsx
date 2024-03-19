import { Command, CommandList } from "../../../components/ui/command";
import Size from "./Size";
const Sizes = ({ sizes, selectedSizeType }) => {
  return (
    <>
      <Command className="rounded-lg border shadow-md">
        <CommandList className="h-[60vh] max-h-full">
          {sizes
            .find((fsize) => fsize.sizeType === selectedSizeType)
            .sizeNames.toSorted()
            .map((s) => (
              <Size key={`size${s}`} sizeName={s} sizeType={selectedSizeType} />
            ))}
        </CommandList>
      </Command>
    </>
  );
};
export default Sizes;
