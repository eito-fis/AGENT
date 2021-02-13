// When user clicks on dropdown header => hide dropdown
export const handleDropdownHeaderClick = (dropdownVisibleArr, setDropdownVisibleArr, index) => {
  const newDropdownVisibleArr = [...dropdownVisibleArr];
  newDropdownVisibleArr[index] = !newDropdownVisibleArr[index];
  setDropdownVisibleArr(newDropdownVisibleArr);
};