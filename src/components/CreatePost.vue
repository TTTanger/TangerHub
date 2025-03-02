<template>
	<div class="newpost-container">
		<form @submit.prevent="submitPost">
			<div class="form-group">
				<label for="title">Title:</label>
				<input type="text" id="title" name="title" v-model="title" placeholder="Enter post title">
			</div>
			<div class="form-group">
				<label for="content">Content:</label>
				<div class="content-editor">
					<div class="toolbar">
						<button type="button" class="tool-button" @click="formatText('bold')">B</button>
						<button type="button" class="tool-button" @click="formatText('italic')">I</button>
						<button type="button" class="tool-button" @click="formatText('underline')">U</button>
						<div class="divider"></div>
						<button type="button" class="tool-button" @click="uploadImages()">📷</button>
						<!--drag to upload files-->
						<input type="file" class="tool-button" multiple>🔗
					</div>
					<textarea id="content" name="content" v-model="content" placeholder="Write your post content here"
						rows="6"></textarea>
				</div>
			</div>
			<button class="submit-button" @click="submitPost">Submit Post</button>
		</form>
	</div>
</template>

<script>
import BackButton from './BackButton.vue'
import User from './User.vue'

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export default {
	name: 'CreatePost',
	components: {
		BackButton,
		User,
	},

	props: {
		user: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			author: this.user,
			id: '',
			title: '',
			content: '',
			images: [],
			files: [],
		}
	},
	methods: {
		async submitPost() {
			try {
				this.id = uuidv4();
				const mockResponse = await Promise.resolve({data: {id: this.id, author: this.user, title: this.title, content: this.content, images: this.images, files: this.files}});
				/*const response = await axios.post('/post/create', {
					id: this.id,
					author: this.user,
					title: this.title,
					content: this.content,
					images: this.images,
					files: this.files,
				});
				console.log('Post submitted:', response.data);
			} catch (error) {
				console.error('Failed to submit post:', error);
			}*/
				
				console.log('Post submitted:', mockResponse.data);
				} 
				catch (error) {
				console.error('Failed to submit post:', error);
				}
		},
		formatText(command) {
			console.log('Formatted')
		},
		uploadImages() {
			console.log('Images uploaded')
		},
		uploadFiles() {
			console.log('Files uploaded')
		},
	},
}
</script>

<style scoped>
.newpost-container {
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	background-color: lightblue;
	border-radius: 12px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	padding: 2.5rem 1.5rem;
	max-height: 410px;
	box-sizing: border-box;
}

form {
	width: 100%;
}

.form-group {
	margin-bottom: 0.5rem;
	text-align: left;
}

label {
	display: block;
	margin-bottom: 0.5rem;
	color: #444;
	font-weight: 600;
}

input[type="text"],
textarea {
	width: 100%;
	padding: 1rem 0.2rem;
	border: 1px solid #ddd;
	border-radius: 6px;
	font-size: 1rem;
	transition: border-color 0.3s ease;
	
}

input[type="text"]:focus,
textarea:focus {
	outline: none;
	border-color: #4a90e2;
	box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.content-editor {
	border: 1px solid #ddd;
	border-radius: 6px;
	overflow: hidden;
}

.toolbar {
	display: flex;
	gap: 0.5rem;
	padding: 0.75rem;
	background-color: #f5f5f5;
	border-bottom: 1px solid #ddd;
}

.tool-button {
	padding: 0.25rem 0.5rem;
	border: 1px solid #ddd;
	background-color: white;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.2s ease;
}

.tool-button:hover {
	background-color: #f0f0f0;
	border-color: #999;
}

.divider {
	width: 1px;
	background-color: #ddd;
	margin: 0 0.5rem;
}

textarea {
	border: none;
	border-radius: 0;
}

textarea:focus {
	box-shadow: none;
}

#content {
	padding: 0.5rem;
}

.submit-button {
	background-color: #4a90e2;
	color: white;
	padding: 0.75rem;
	border: none;
	border-radius: 6px;
	font-size: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease;
	width: 100%;
}

.submit-button:hover {
	background-color: #357abd;
}

@media (max-width: 768px) {
	.newpost-page {
		padding: 1rem;
	}
	.newpost-container {
		padding: 1.5rem;
	}
}
</style>