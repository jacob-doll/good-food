<div class="w-full mt-4">
	<h2 class="text-3xl">Food Details</h2>
	<div class="divider" />
	<form method="POST" class="form-control gap-2 max-w-lg">
		<div class="input-group input-group-vertical">
			<span class="text-center">Brand Info</span>
			<input class="input input-bordered" name="brandName" placeholder="Brand Name" />
			<input class="input input-bordered" name="subbrandName" placeholder="Sub Brand Name" />
			<input class="input input-bordered" name="brandOwner" placeholder="Brand Owner" />
			<input class="input input-bordered" name="brandedFoodCategory" placeholder="Brand Category" />
		</div>

		<div class="input-group input-group-vertical">
			<span class="text-center">Description</span>
			<textarea class="input input-bordered h-20" name="description" placeholder="Description" />
			<input class="input input-bordered" name="shortDescription" placeholder="Short Description" />
		</div>

		<div class="input-group input-group-vertical">
			<span class="text-center">Ingredients</span>
			<textarea class="input input-bordered h-20" name="ingredients" placeholder="Ingredients" />
		</div>

		<div class="input-group input-group-vertical">
			<span class="text-center">Serving Size</span>
			<input class="input input-bordered" name="servingSize" placeholder="Amount" />
			<select class="select" name="servingSizeUnit">
				<option disabled selected>Unit</option>
				<option>g</option>
				<option>ml</option>
			</select>
			<input
				class="input input-bordered"
				name="householdServingFullText"
				placeholder="Serving Text"
			/>
		</div>

		<div class="input-group input-group-vertical">
			<span class="text-center">Package Weight</span>
			<input class="input input-bordered" name="packageWeight" placeholder="Weight" />
		</div>

		<div class="input-group input-group-vertical">
			<span class="text-center">Nutrition Label Info</span>
			<input class="input input-bordered" name="calories" placeholder="Calories" />
			<input class="input input-bordered" name="fat" placeholder="Fat" />
			<input class="input input-bordered" name="saturatedFat" placeholder="Saturated Fat" />
			<input class="input input-bordered" name="transFat" placeholder="Trans Fat" />
			<input class="input input-bordered" name="cholesterol" placeholder="Cholesterol" />
			<input class="input input-bordered" name="sodium" placeholder="Sodium" />
			<input class="input input-bordered" name="carbohydrates" placeholder="Carbohydrates" />
			<input class="input input-bordered" name="fiber" placeholder="Fiber" />
			<input class="input input-bordered" name="sugars" placeholder="Sugars" />
			<input class="input input-bordered" name="protein" placeholder="Protein" />
			<input class="input input-bordered" name="calcium" placeholder="Calcium" />
			<input class="input input-bordered" name="iron" placeholder="Iron" />
			<input class="input input-bordered" name="potassium" placeholder="Potassium" />
		</div>

		<button class="btn btn-primary" type="submit">Add</button>
	</form>
</div>
