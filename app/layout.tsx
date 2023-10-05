import Link from "next/link"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div>layiut text</div>
                <div>
                    <Link href={'/pink'}>pink</Link>
                </div>
                {children}
            </body>
        </html>
    )
}