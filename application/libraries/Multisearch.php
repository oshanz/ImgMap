<?php

/**
 * @author Waruna Oshan Wisumperuma
 * @contact warunaoshan@gmail.com
 * 
 * https://gist.github.com/oshanz/97782c79ac186c5f6e59
 * Semantic version = 1.0.0
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Multisearch {

    private $query;
    private $date_between;

    function __construct() {
        $this->query = array();
    }

    /**
     * For = Query
     * @param String $column - column name
     * @param Any $value - search argument
     */
    public function set_equel($column, $value) {
        if (isset($value) && is_numeric($value) || !empty($value)) {
            $this->query[] = "$column = '$value'";
        }
    }

    /**
     * For like Query %%
     * @param String $column - column name
     * @param Any $value - search argument
     */
    public function set_like($column, $value) {
        if (isset($value) && is_numeric($value) || !empty($value)) {
            $this->query[] = "$column LIKE '%$value%'";
        }
    }

    /**
     * For Begin like Query %xxx
     * @param String $column - column name
     * @param Any $value - search argument
     */
    public function set_like_L($column, $value) {
        if (isset($value) && is_numeric($value) || !empty($value)) {
            $this->query[] = "$column LIKE '%$value'";
        }
    }

    /**
     * For End like Query xxx%
     * @param String $column - column name
     * @param Any $value - search argument
     */
    public function set_like_R($column, $value) {
        if (isset($value) && is_numeric($value) || !empty($value)) {
            $this->query[] = "$column LIKE '$value%'";
        }
    }

    /**
     * 
     * @param String $column
     * @param String $from
     * @param String $to
     */
    public function set_date_between($column, $from, $to) {
        if (isset($from) && isset($to) && !empty($from) && !empty($to)) {
            $this->date_between = " $column BETWEEN '$from' AND '$to' ";
        }
    }

    /**
     * get Query
     * @return string
     */
    public function __toString() {
        $query = ' ';
        if (!empty($this->query) && !is_null($this->date_between)) {
            $query = ' AND ' . implode(' AND ', $this->query) . ' AND ' . $this->date_between . ' ';
        } elseif (!empty($this->query)) {
            $query = ' AND ' . implode(' AND ', $this->query) . ' ';
        } elseif (!is_null($this->date_between)) {
            $query = ' AND ' . $this->date_between . ' ';
        }
        return $query;
    }

}
