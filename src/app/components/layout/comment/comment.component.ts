import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommentService } from '../../../service/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  nameComment!: string;
  text!: string;

  rating: number = 0;         
  hoverRating: number = 0;    

  commentService=inject(CommentService);
  router=inject(Router);

  comments: any[] = []; 
  constructor() {
    this.findAll();

  }
  addComment(): void {
    if (!this.nameComment || !this.text) {
      Swal.fire('Preencha todos os campos', '', 'warning');
      return;
    }
  
    const newComment = {
      name: this.nameComment,
      text: this.text,
      date: new Date()
    };
   
    console.log('Comentário adicionado:', newComment);
  
    this.nameComment = '';
    this.text = '';
  }

  async findAll() {
    try {
      this.comments = await this.commentService.findAll();
    } catch (erro) {
      Swal.fire('Erro ao buscar comentários', '', 'error');
    }
  }

  setRating(star: number): void {
    this.rating = star;
  }
  
  setHover(star: number): void {
    this.hoverRating = star;
  }
  
  clearHover(): void {
    this.hoverRating = 0;
  }
  
}
