<template>
	<div class="container mt-5">
		<h1 class="mb-4">Suchebereich</h1>
		<div class="input-group mb-3">
			<input
				v-model="search"
				class="form-control"
				placeholder="Search..."
			/>
			<button @click="performSearch" class="btn btn-primary">
				Suchen
			</button>
		</div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Bild</th>
					<th>ID</th>
					<th>Beschreibung</th>
					<th>Historie</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="r in res" :key="r.id">
					<td class="item">
						<img
							:src="img_path + r.thumb"
							alt="Image"
							class="img-thumbnail"
							height="200px"
						/>
					</td>
					<td class="item">
						<b>{{ r.id }}</b>
					</td>
					<td class="item">
						<textarea
							v-model="r.description"
							class="form-control mb-2"
							cols="50"
							rows="4"
						></textarea>
						<button
							@click="updateDescription(r)"
							class="btn btn-success btn-sm m-1"
						>
							Update
						</button>
						<button
							@click="showHistory(r)"
							class="btn btn-info btn-sm m-1"
						>
							Show History
						</button>
					</td>
					<td class="item">
						<p>History:</p>
						<ul v-if="r.history" class="list-group">
							<li
								v-for="history in r.history"
								:key="history.id"
								class="list-group-item"
							>
								{{ history.datum }} - {{ history.description }}
							</li>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "App",
	data() {
		return {
			img_path: "http://webapp.uibk.ac.at/ubi/cat/",
			search: "Uni",
			res: [],
		};
	},
	methods: {
		async api_search(q) {
			const response = await axios.get(
				`http://localhost:5000/cat-search/${q}`,
				{}
			);
			return response.data;
		},
		async performSearch() {
			this.res = await this.api_search(this.search);
		},
		async updateDescription(r) {
			const response = await axios.patch(
				`http://localhost:5000/cat-item/${r.id}`,
				{
					params: {
						description: r.description,
					},
				}
			);
			return response.data;
		},
		async showHistory(r) {
			const response = await axios.get(
				`http://localhost:5000/change-history/${r.id}`
			);
			r.history = response.data;
		},
	},
	mounted() {
		this.performSearch();
	},
};
</script>

<style>
.item {
	padding: 10px;
	min-width: 50px;
}
</style>
