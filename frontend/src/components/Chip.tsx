
type Props = {
  text: string,
  onClose?: () => void,
}

const Chip = (props: Props) => {
  return (
    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-gray-100 bg-gray-500 border border-gray-500 ">
      <div className="font-normal leading-none max-w-full flex-initial">{props.text}</div>
      {props.onClose && (
        <div className="flex flex-auto flex-row-reverse">
          <div>
            <svg onClick={() => {if (props.onClose) props.onClose()}} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-gray-700 rounded-full w-4 h-4 ml-2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Chip;