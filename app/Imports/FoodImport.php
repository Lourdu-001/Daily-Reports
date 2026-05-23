<?php

namespace App\Imports;

use App\Models\FoodChart;
use Maatwebsite\Excel\Concerns\ToModel;

class FoodImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new FoodChart([
            //
        ]);
    }
}
