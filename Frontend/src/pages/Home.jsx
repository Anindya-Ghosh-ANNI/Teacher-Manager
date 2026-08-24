import {TSBtn} from "../index"

function Home(){
    return(
        <>
        <div className="min-h-dvh bg-green-50 flex items-center justify-center px-5">
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-green-950">
                        Welcome
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Choose how you want to continue
                    </p>
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <TSBtn title="Student" route="student"/>
                    <TSBtn title="Teacher" route="teacher/loginOrRegister"/>
                </div>

                <p className="text-center text-sm text-gray-400 mt-8">
                Select your role to get started
                </p>

            </div>
        </div>
        </>
    )
}

export default Home