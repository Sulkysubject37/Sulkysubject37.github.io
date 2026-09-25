#!/bin/bash
# Exit immediately if a command exits with a non-zero status
set -e 

# ==========================================
# CONFIGURATION (Change these paths!)
# ==========================================
READ1="sample_R1.fastq.gz"
READ2="sample_R2.fastq.gz"
REF_GENOME="reference.fasta"
OUT_DIR="./ngs_output"
THREADS=4

# Create output directories
mkdir -p ${OUT_DIR}/{fastqc_raw,fastqc_trimmed,trimmed,aligned}

echo "Starting NGS Pipeline..."

# ==========================================
# 1. Pre-trimming Quality Control (FastQC)
# ==========================================
echo "[1/6] Running FastQC on raw reads..."
fastqc -t ${THREADS} -o ${OUT_DIR}/fastqc_raw ${READ1} ${READ2}

# ==========================================
# 2. Adapter Trimming (Trimmomatic)
# ==========================================
# Note: Path to TruSeq3-PE.fa depends on your Trimmomatic installation
echo "[2/6] Running Trimmomatic..."
trimmomatic PE -threads ${THREADS} \
  ${READ1} ${READ2} \
  ${OUT_DIR}/trimmed/paired_R1.fq.gz ${OUT_DIR}/trimmed/unpaired_R1.fq.gz \
  ${OUT_DIR}/trimmed/paired_R2.fq.gz ${OUT_DIR}/trimmed/unpaired_R2.fq.gz \
  ILLUMINACLIP:TruSeq3-PE.fa:2:30:10 LEADING:3 TRAILING:3 SLIDINGWINDOW:4:15 MINLEN:36


# 3. Post-trimming Quality Control (FastQC)

echo "[3/6] Running FastQC on trimmed reads..."
fastqc -t ${THREADS} -o ${OUT_DIR}/fastqc_trimmed \
  ${OUT_DIR}/trimmed/paired_R1.fq.gz ${OUT_DIR}/trimmed/paired_R2.fq.gz


# 4. Alignment & SAM Generation (BWA-MEM)

echo "[4/6] Aligning reads to reference genome..."
bwa mem -t ${THREADS} ${REF_GENOME} \
  ${OUT_DIR}/trimmed/paired_R1.fq.gz ${OUT_DIR}/trimmed/paired_R2.fq.gz \
  > ${OUT_DIR}/aligned/sample_aligned.sam

# ==========================================
# 5. Convert SAM to BAM, Sort, and Index (Samtools)
# ==========================================
# BAM is the compressed binary version of SAM. Sorting is required for most tools.
echo "[5/6] Converting to BAM, sorting, and indexing..."
samtools view -@ ${THREADS} -bS ${OUT_DIR}/aligned/sample_aligned.sam > ${OUT_DIR}/aligned/sample_aligned.bam
samtools sort -@ ${THREADS} -o ${OUT_DIR}/aligned/sample_sorted.bam ${OUT_DIR}/aligned/sample_aligned.bam
samtools index ${OUT_DIR}/aligned/sample_sorted.bam

# Optional cleanup to save space: remove the massive SAM file
rm ${OUT_DIR}/aligned/sample_aligned.sam


# Index the final BAM
samtools index ${OUT_DIR}/aligned/sample_dedup.bam

echo "Pipeline Finished Successfully!"
