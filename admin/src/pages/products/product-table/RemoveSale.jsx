const RemoveSale = ({ table }) => {
  return (
    <div
      onClick={() => {
        console.log(
          table.getSelectedRowModel().flatRows.map((row) => row.original),
        );
      }}
    >
      remove sale
    </div>
  );
};
export default RemoveSale;
