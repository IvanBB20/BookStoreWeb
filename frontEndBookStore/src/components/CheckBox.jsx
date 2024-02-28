import React from "react";
import Form from "react-bootstrap/Form";

export default function CheckBox({
  id,
  label,
  disabled,
  checked,
  setCheckBox,
  priceIdCount,
}) {
  const styleForm = {
    borderStyle: "solid",
    width: "160px",
    height:"60px",
    display:"flex",
    alignItems:"center",
    backgroundColor: disabled ? "red" : "#AAC2E4",
  };

  const checkBox = (curId) => {
    setCheckBox((prevCheckBox) => {
      var newArr = prevCheckBox.map((item) => {
        if (curId < priceIdCount && item.id < priceIdCount) {
          if (item.id === curId) {
            return { ...item, checked: !item.checked };
          } else {
            return { ...item, disabled: !item.disabled };
          }
        } else if (curId >= priceIdCount && item.id >= priceIdCount) {
          if (item.id === curId) {
            return { ...item, checked: !item.checked };
          } else {
            return  { ...item, disabled: !item.disabled };
          }
        } else {
          return item;
        }
      });

      return newArr;
    });
  };
  return (
    <div style={styleForm}>
      <Form.Check
        type="checkbox"
        onChange={() => {
          checkBox(id);
        }}
        label={label}
        id={id}
        checked={checked}
        disabled={disabled}
      />
    </div>
  );
}
