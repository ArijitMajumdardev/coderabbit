"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {  useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getConnectedRepositories,disconnectALLRepository,disconnectRepository } from "@/modules/settings/actions";

const RepositoryList = () => {
  return <div>RepositoryList</div>;
};

export default RepositoryList;
