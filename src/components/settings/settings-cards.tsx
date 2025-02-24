"use client"

import { useContext } from "react"

import { AuthUIContext } from "../../lib/auth-ui-provider"
import { cn } from "../../lib/utils"

import { ChangeEmailCard } from "./change-email-card"
import { DeleteAccountCard } from "./delete-account-card"
import type { SettingsCardClassNames } from "./settings-card"
import { UpdateNameCard } from "./update-name-card"
import { UpdateUsernameCard } from "./update-username-card"

export const settingsLocalization = {
    deleteAccount: "Delete Account",
    deleteAccountDescription: "Permanently remove your Account and all of its contents. This action is not reversible, so please continue with caution.",
    name: "Name",
    nameDescription: "Please enter your full name, or a display name.",
    nameInstructions: "Please use 32 characters at maximum.",
    namePlaceholder: "Name",
    email: "Email",
    emailDescription: "Enter the email address you want to use to log in.",
    emailInstructions: "Please use a valid email address.",
    emailPlaceholder: "m@example.com",
    emailVerifyChange: "Please check your email to verify the change.",
    emailVerification: "Check your email for the verification link.",
    save: "Save",
    username: "Username",
    usernameDescription: "Enter the username you want to use to log in.",
    usernameInstructions: "Please use 32 characters at maximum.",
    usernamePlaceholder: "Username",
}

export function SettingsCards({
    className,
    classNames,
    localization
}: {
    className?: string,
    classNames?: SettingsCardClassNames,
    localization?: Partial<typeof settingsLocalization>
}) {
    const { usernamePlugin } = useContext(AuthUIContext)

    return (
        <div className={cn("w-full flex flex-col gap-4 items-center", className)}>
            {usernamePlugin && (
                <UpdateUsernameCard
                    classNames={classNames}
                    localization={localization}
                />
            )}

            <UpdateNameCard
                classNames={classNames}
                localization={localization}
            />

            <ChangeEmailCard
                classNames={classNames}
                localization={localization}
            />

            <DeleteAccountCard />
        </div>
    )
}