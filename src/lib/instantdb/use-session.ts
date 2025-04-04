import type { User } from "better-auth"
import { useMemo } from "react"
import type { AuthHooks } from "../../types/auth-hooks"
import { getModelName } from "./model-names"
import type { UseInstantOptionsProps } from "./use-instant-options"

export function useSession({
    db,
    useSession,
    usePlural,
    modelNames
}: UseInstantOptionsProps): ReturnType<AuthHooks["useSession"]> {
    const { data: sessionData, isPending, error: sessionError } = useSession()
    const { user: authUser, error } = db.useAuth()

    const modelName = getModelName({
        namespace: "user",
        modelNames,
        usePlural
    })

    const { data } = db.useQuery(
        authUser ? { [modelName]: { $: { where: { id: authUser?.id } } } } : null
    )

    const user = useMemo(() => {
        if (data?.[modelName]?.length) {
            const user = data[modelName][0]
            return {
                ...user,
                createdAt: new Date(user.createdAt as string),
                updatedAt: new Date(user.updatedAt as string)
            } as User
        }
        return null
    }, [data, modelName])

    return {
        data: sessionData
            ? {
                  session: sessionData.session,
                  user: sessionData?.user.id === user?.id ? user : sessionData.user
              }
            : undefined,
        isPending: isPending,
        error: sessionError || error
    }
}
