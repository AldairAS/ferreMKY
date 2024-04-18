"use client";
import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSearchSchema } from "@models/schemas";
import { z } from "zod";

function useQueryParams() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  // const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSearchSchema>>({
    resolver: zodResolver(FormSearchSchema),
    defaultValues: {
      search: "",
    },
  });
  // const queryParams = router.query;

  // const handleSearchChange = (newValue: string) => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: { ...queryParams, q: newValue },
  //   });
  // };

  // const handlePageChange = (newPage: number) => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: { ...queryParams, page: newPage },
  //   });
  //   setPage(newPage);
  // };

  const handleIncrementPage = () => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get("page") as string) || 1;
    setPage(currentPage + 1);
  };

  const handleDecrementPage = () => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get("page") as string) || 1;
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   // const value = params.get("q");
  //   const page = params.get("page");

  //   // if (value) {
  //   //   setValue(value);
  //   // }

  //   if (page) {
  //     setPage(parseInt(page));
  //   }

  //   if (!page) {
  //     setPage(1);
  //   }
  // }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // console.log("value", form.watch("search"));
    if (form.watch("search") === undefined) {
      return;
    } else if (form.watch("search")) {
      params.set("q", form.watch("search"));
      // router.replace(`/?${params.toString()}`);
      // window.history.pushState(null, '', `?${params.toString()}`);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      // All navigations are transitions automatically
      // But wrapping this allow us to observe the pending state
      // router.replace(`/?${params.toString()}`);
      window.history.pushState(null, "", `?${params.toString()}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, form.getValues("search")]);

  return {
    page,
    form,
    isPending,
    handleIncrementPage,
    handleDecrementPage,
  };
}

export default useQueryParams;
