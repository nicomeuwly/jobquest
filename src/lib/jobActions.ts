export const createJob = async (
    event: React.FormEvent<HTMLFormElement>,
    setUpdates: (value: number) => void,
    updates: number,
    router: any
) => {
    try {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const job = Object.fromEntries(formData.entries());

        const response = await fetch("/api/jobs/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job),
        });

        if (response.ok) {
            console.log("Job created successfully");
            setUpdates(updates + 1);
            router.replace("/");
        } else {
            console.error("Failed to create job");
        }
    } catch (error) {
        console.error("An error occurred while creating the job");
    }
};

export const getJobs = async () => {
    try {
        const response = await fetch("/api/jobs");
        const jobs = await response.json();
        return jobs;
    } catch (error) {
        console.error("An error occurred while fetching jobs");
    }
};

export const getJob = async (id: number) => {
    try {
        const response = await fetch(`/api/jobs/${id}`);
        const job = await response.json();
        return job;
    }
    catch (error) {
        console.error("An error occurred while fetching the job");
    }
};

export const updateJob = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
    setUpdates: (value: number) => void,
    updates: number,
    router: any
) => {
    try {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const job = Object.fromEntries(formData.entries());

        console.log(job);

        const response = await fetch(`/api/jobs/edit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job),
        });

        if (response.ok) {
            console.log("Job updated successfully");
            setUpdates(updates + 1);
            router.replace("/");
        } else {
            console.error("Failed to update job");
        }
    } catch (error) {
        console.error("An error occurred while updating the job");
    }
};

export const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    setJobDetails: (arg0: (prev: any) => any) => void,
    baseDate: string,
    setUpdates: (value: number) => void,
    updates: number
) => {
    const newStatus = parseInt(event.target.value);

    setJobDetails((prev) => {
        if (!prev?.id) return prev;
        const updatedJob = {
            ...prev,
            status: newStatus,
            mailingDate: newStatus === 0
                ? baseDate
                : newStatus === 1 && prev.mailingDate === baseDate
                    ? new Date().toISOString()
                    : prev.mailingDate,
        };

        (async () => {
            try {
                const response = await fetch(`/api/jobs/edit/${prev.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedJob),
                });

                if (!response.ok) {
                    throw new Error("An error occurred while updating the status");
                }

                setUpdates(updates + 1);
                console.log("Status updated successfully");
            } catch (error) {
                console.error(error);
            }
        })();

        return updatedJob;
    });
};

export const handleDeleteItem = async (
    id: number,
    setUpdates: (value: number) => void,
    updates: number
) => {
    try {
        const response = await fetch(`/api/jobs/edit/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("An error occurred while deleting the job");
        }

        setUpdates(updates + 1);
        console.log("Job deleted successfully");
    } catch (error) {
        console.error(error);
    }
};