
function SubmitBtn({title, type, onClick, loader, extraClassName}) {
  return (
    <>
        <button type={type}
            disabled={loader}
            onClick={onClick}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex justify-center ${extraClassName}`}
        >
            {loader? 
                <span className="block w-5 h-5 border-2 border-white border-t-transparent   rounded-full animate-spin"></span>
                :
                title
            }
        </button>
    </>
  )
}

export default SubmitBtn