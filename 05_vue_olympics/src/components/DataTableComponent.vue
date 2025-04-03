<template>
	<div>
		<DataTable
			class="table table-hover table-striped"
			width="100%"
			:data="data"
		>
			<thead>
				<tr>
					<th v-for="c in columns">{{ c }}</th>
				</tr>
			</thead>
			<tfoot></tfoot>
		</DataTable>
	</div>
</template>

<script>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-bs5";
export default {
	setup() {
		console.log("setup");
		DataTable.use(DataTablesLib);
	},
	components: {
		DataTable,
	},
	data() {
		return {
			columns: ["Name", "Country", "Year", "City", "Sport", "Discipline"],
			// test data for DataTable
			data: [
				[
					"Michael Phelps",
					"USA",
					2008,
					"Beijing",
					"Swimming",
					"Butterfly",
				],
				[
					"Usain Bolt",
					"Jamaica",
					2012,
					"London",
					"Athletics",
					"Sprinting",
				],
				[
					"Simone Biles",
					"USA",
					2016,
					"Rio de Janeiro",
					"Gymnastics",
					"All-around",
				],
				[
					"Katie Ledecky",
					"USA",
					2016,
					"Rio de Janeiro",
					"Swimming",
					"Freestyle",
				],
				[
					"Mo Farah",
					"UK",
					2012,
					"London",
					"Athletics",
					"Long-distance",
				],
				[
					"Allyson Felix",
					"USA",
					2012,
					"London",
					"Athletics",
					"Sprinting",
				],
				[
					"Yelena Isinbayeva",
					"Russia",
					2008,
					"Beijing",
					"Athletics",
					"Pole vault",
				],
				["Ryan Lochte", "USA", 2012, "London", "Swimming", "Medley"],
				[
					"Nadia Comaneci",
					"Romania",
					1976,
					"Montreal",
					"Gymnastics",
					"All-around",
				],
				[
					"Carl Lewis",
					"USA",
					1984,
					"Los Angeles",
					"Athletics",
					"Sprinting",
				],
			],
		};
	},
};
</script>

<style lang="scss" scoped></style>
