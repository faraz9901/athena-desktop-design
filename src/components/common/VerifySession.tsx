import { useCurrentUser } from "@/features/auth/useAuth"

function VerifySession() {

    useCurrentUser()

    return null
}

export default VerifySession