import CourseCard from "~/components/card/CourseCard";
import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCourse, getCourses } from "~/models/content.server";
import invariant from "tiny-invariant";

export const loader = async ({ request, params }: LoaderArgs) => {
    invariant(params.courseId, "Course not found")
    const course = await getCourse(params.courseId ?? "");
    if (!course) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ course });
};

const CourseId = () => {
    const { course } = useLoaderData<typeof loader>();

    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-white">Kurs detaljer</h1>
        </main>
    );
};

export default CourseId;
