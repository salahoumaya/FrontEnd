import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {CommentService} from "../../../shared/service/sujetPfe/comment.service";
import {Comment} from "../../../models/comment";
import {AuthService} from "../../../shared/service/Auth/auth.service";

@Component({
  selector: 'app-comment-sectionn',
  templateUrl: './comment-sectionn.component.html',
  styleUrls: ['./comment-sectionn.component.scss']
})
export class CommentSectionnComponent implements OnInit {

  @Input({transform: numberAttribute}) internshipId!: number;
  userId!: number;

  comments: Comment[] = [];
  newComment: string = "";
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  keyword: string = '';

  filteredComments: Comment[] = [];



  constructor(private CommentService: CommentService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(value => {
      this.userId = value.ourUsers.id;
    })
    this.loadComments();
  }

  loadComments(): void {
    this.CommentService.getComments(this.internshipId)
      .subscribe((data: Comment[]) => this.comments = data);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // If file type is an image, generate a preview via FileReader
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, clear any existing preview
        this.previewUrl = null;
      }
    }
  }

  submitComment(): void {
    const formData: FormData = new FormData();
    formData.append("internshipId", this.internshipId.toString());
    formData.append("content", this.newComment);
    formData.append("senderId", this.userId.toString());
    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
      formData.append("fileName", this.selectedFile.name)
    }

    this.CommentService.postComment(formData)
      .subscribe(response => {
        // Optionally, you can show a success message with Toastr or similar.
        // Reset the form values and file preview
        this.newComment = "";
        this.selectedFile = null;
        this.previewUrl = null;
        // Refresh the comment list
        this.loadComments();
      });
  }

  /**
   * Checks if the provided Base64 string represents an image.
   * The function looks for common signatures:
   * - PNG images typically begin with: "iVBOR" (short for "iVBORw0KGgo")
   * - JPEG images usually start with: "/9j/" (derived from 0xFFD8)
   * - GIF images often start with: "R0lGOD" (from "GIF87a" or "GIF89a")
   *
   * @param fileData The Base64 string of the file.
   * @returns True if the file appears to be an image; otherwise, false.
   */
  isImage(fileData: string | undefined): boolean {
    if (!fileData) {
      return false;
    }
    return fileData.startsWith("iVBOR") ||
      fileData.startsWith("/9j/") ||
      fileData.startsWith("R0lGOD");
  }
  searchComments(): void {
    if (this.keyword) {
      this.CommentService.searchComments(this.keyword)
        .subscribe((data: Comment[]) => {
          this.filteredComments = data; // Mettre à jour les commentaires filtrés
        });
    } else {
      this.filteredComments = this.comments; // Réinitialiser si le champ de recherche est vide
    }
  }



}
