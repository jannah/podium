<?php
class item
{

    var $iid = 0;
	var $uid = "";
	var $name = "";
	var $price = "";
	var $unit = "";
    var $description = "";
    var $photo = "";
     
    function __construct($iid = 0){
        $this->iid = $iid;
        $this->fetch();
    }
    
    private function fetch(){
        if(!is_null($this->iid) && $this->iid > 0){
            $SQL = "SELECT * FROM item WHERE iid = '".$this->iid."'";
            
            $RS = mysql_query($SQL) or die("Error with $classNaam: ".mysql_error());
            
            if($row = mysql_fetch_assoc($RS)){
                foreach($row as $key => $value){
                    $this->$key = $value;
                }
                return true;
            }
        }
        return false;
    }
	
    public function get($field){
        
        switch($field){
        
            default:
                return $this->$field;
            break;
        }
    }
    
    public function set($field, $value){
        
        switch($field){
     
            default:    
                $this->$field = $value;
            break;
        }
    }

    function save(){
    	if($this->iid > 0){
        	/**
             *  Object bestaat, bestaande rij in de database bijwerken.
             */
        	$SQL = "UPDATE item SET iid = '".mysql_real_escape_string($this->iid).
                "', uid = '".mysql_real_escape_string($this->uid).
                "',  name = '".mysql_real_escape_string($this->name).
                "',  price = '".mysql_real_escape_string($this->price).
                "',  unit = '".mysql_real_escape_string($this->unit).
                "',  photo = '".mysql_real_escape_string($this->photo).
                "', description = '".mysql_real_escape_string($this->description)."' WHERE iid = '".$this->iid."'";
			
            if(@mysql_query($SQL)){
            	return true;
            }else{
            	print("Error saving item point into table item: <br /><pre>".mysql_error()."<br />".$SQL."</pre>");
                return false;
            }           
        }else{
    		$SQL = "INSERT INTO item (iid, uid, name, price, unit, photo, description) VALUES ('".
                        mysql_real_escape_string($this->iid).
                        "', '".mysql_real_escape_string($this->uid).
                        "', '".mysql_real_escape_string($this->name).                        
                        "', '".mysql_real_escape_string($this->price).
                        "', '".mysql_real_escape_string($this->unit).
                        "', '".mysql_real_escape_string($this->photo).
                        "','".mysql_real_escape_string($this->description)."');"; 
            
            $RS = mysql_query($SQL) or print("Error saving item point into table item: <br /><pre>".mysql_error()."<br />".$SQL."</pre>");

            if($iid = @mysql_insert_iid()){
            	$this->iid = $iid;
                return true;
            }else{
            	return false;
            }
        }
		return false;
    }
    
    public function delete(){
    	if($this->iid > 0){
        	
        	$SQL = "DELETE FROM item WHERE iid = '".$this->iid."' LIMIT 1; "; 
			
            $RS = mysql_query($SQL) or die("Error deleting item point from table item: <br /><pre>".mysql_error()."<br />".$SQL."</pre>");
            
            if(mysql_affected_rows() > 0){
 				return true;
			}
        }else{
        	return false;
        }        
    }
	
	public static function listByShop($uid){
		
		$SQL = "SELECT iid FROM item WHERE uid = '".$uid."'";
		
		$RS = mysql_query($SQL);
		
        $num_rows = mysql_num_rows($RS);
        
		$items = array();
		while ($row = mysql_fetch_assoc($RS)){
			 $items[] = new item($row['iid']); 
		}
		
		return $items;
	}
	
    function __toString(){
    	$output = "<pre>Object type: item \n";
        $output .= "Gekoppelde tabel: item \n";
        $output .= "iidentifier (iid): ".$this->iid."\n\n";
        $output .= "------Veldgegevens------------\n";        
        $output .= "uid (int): ".$this->uid." \n";
		$output .= "price (varchar): ".$this->price." \n";
		$output .= "unit (varchar): ".$this->unit." \n";
		$output .= "name (varchar): ".$this->name." \n";
		
        $output .= "------Einde Veldgegevens------\n\n</pre>"; 
        return $output;    	
    }
}
?>